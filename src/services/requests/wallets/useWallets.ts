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
} from "@/services/database/wallets/useWalletsDatabase";
import { useWeb3 } from "@/common/hooks/useWeb3";
import { Network } from "alchemy-sdk";
import { BigNumber } from "ethers";

export const useGetWalletBalance = (
  address: string,
  network: Network,
  options?: Omit<UseQueryOptions<BigNumber, Error>, "queryKey" | "queryFn">
) => {
  const { getBalance } = useWeb3(network);

  return useQuery({
    queryKey: ["walletBalance", address, network],
    queryFn: () => getBalance(address),
    enabled: !!address && !!network,
    ...options,
  });
};

export const useWallets = (search?: string) => {
  const queryClient = useQueryClient();

  const { data: wallets = [], isLoading } = useQuery({
    queryKey: ["wallets", search],
    queryFn: () => getAllWallets(search),
  });

  const addWalletMutation = useMutation({
    mutationFn: async (wallet: Omit<IWalletDB, "id">) => {
      const { getBalance } = useWeb3(wallet.network);
      const balance = await getBalance(wallet.address);

      return insertWallet({
        ...wallet,
        balance: balance.toString(),
        last_balance_update: new Date().toISOString(),
      });
    },
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
      queryClient.invalidateQueries({
        queryKey: ["portfolio"],
      });
      queryClient.invalidateQueries({
        queryKey: ["mainBalance"],
      });
    },
    onError: async (error) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      queryClient.invalidateQueries({
        queryKey: ["wallets"],
      });
      queryClient.invalidateQueries({
        queryKey: ["portfolio"],
      });
      queryClient.invalidateQueries({
        queryKey: ["mainBalance"],
      });
    },
  });

  return {
    wallets,
    isLoading,
    addWallet: addWalletMutation.mutateAsync,
    isPendingAddWallet: addWalletMutation.isPending,
    updateBalance: updateBalanceMutation.mutate,
    isPendingUpdateBalance: updateBalanceMutation.isPending,
  };
};
