import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  getAllWallets,
  insertWallet,
  updateWalletBalance,
  IWalletDB,
} from "@/services/database";
import { useWeb3 } from "@/common/hooks/useWeb3";
import { Network } from "alchemy-sdk";
import { BigNumber } from "ethers";

export const useGetWalletBalance = (
  address: string,
  network: Network,
  options?: Omit<
    UseQueryOptions<BigNumber, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const { getBalance } = useWeb3(network);

  return useQuery({
    queryKey: ["walletBalance", address, network],
    queryFn: () => getBalance(address),
    enabled: !!address && !!network,
    ...options,
  });
};

export const useWallets = () => {
  const queryClient = useQueryClient();

  const { data: wallets = [], isLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: getAllWallets,
  });

  const addWalletMutation = useMutation({
    mutationFn: async (wallet: IWalletDB) => {
      const { getBalance } = useWeb3(wallet.network);
      const balance = await getBalance(wallet.address);

      return insertWallet({
        ...wallet,
        balance: balance.toString(),
        last_balance_update: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
    onError: (error) => {
      console.log("Error adding wallet", error);
    },
  });

  const updateBalanceMutation = useMutation({
    mutationFn: ({
      address,
      balance,
      network,
    }: {
      address: string;
      balance: string;
      network: Network;
    }) => updateWalletBalance(address, balance, network),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallets"] });
    },
  });

  return {
    wallets,
    isLoading,
    addWallet: addWalletMutation.mutateAsync,
    isPendingAddWallet: addWalletMutation.isPending,
    updateBalance: updateBalanceMutation.mutateAsync,
  };
};
