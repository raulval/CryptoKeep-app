import { BottomSheetSettings } from "@/components/BottomSheetSettings";
import { HeaderHome } from "@/components/HeaderHome";
import { MainCard } from "@/components/MainCard";
import { useRef } from "react";
import Bottom from "@gorhom/bottom-sheet";
import {
  Platform,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { PortfolioList } from "@/components/PortfolioList";
import { BottomSheetAddWallet } from "@/components/BottomSheetAddWallet";
import { WalletsList } from "@/components/WalletsList";
import { colors } from "@/theme/colors";

export default function Home() {
  const { t } = useTranslation("home");
  const bottomSheetSettingsRef = useRef<Bottom>(null);
  const handleBottomSheetSettingsOpen = () =>
    bottomSheetSettingsRef.current?.expand();
  const handleBottomSheetSettingsClose = () =>
    bottomSheetSettingsRef.current?.snapToIndex(0);
  const bottomSheetAddWalletRef = useRef<Bottom>(null);
  const handleBottomSheetAddWalletOpen = () =>
    bottomSheetAddWalletRef.current?.expand();
  const handleBottomSheetAddWalletClose = () =>
    bottomSheetAddWalletRef.current?.snapToIndex(0);
  return (
    <SafeAreaView
      className="flex-1 bg-light-background dark:bg-dark-background"
      style={{
        paddingTop: Platform.OS === "ios" ? 0 : 36,
      }}
    >
      <HeaderHome onOpenSettingsBottomSheet={handleBottomSheetSettingsOpen} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {}}
            colors={[colors.primary]}
          />
        }
      >
        <View className="gap-[32px] mb-6">
          <MainCard />
          <View className="flex flex-col gap-4">
            <Text className="px-[24px] text-[18px] font-bold text-light-text dark:text-dark-text">
              {t("My Portfolio")}
            </Text>
            <PortfolioList />
          </View>
          <View className="flex flex-col gap-4 mt-[-16px]">
            <View className="flex flex-row items-center justify-between pr-[18px] mb-4">
              <Text className="px-[24px] text-[18px] font-bold text-light-text dark:text-dark-text">
                {t("My Wallets")}
              </Text>
              <Pressable
                className={`w-[125px] h-[40px] bg-primary rounded-[16px] flex items-center justify-center`}
                onPress={handleBottomSheetAddWalletOpen}
              >
                <Text
                  className={`text-[14px] font-medium text-center text-dark-text`}
                >
                  {t("Add wallet")}
                </Text>
              </Pressable>
            </View>
            <WalletsList />
          </View>
        </View>
      </ScrollView>
      <BottomSheetSettings
        ref={bottomSheetSettingsRef}
        onClose={handleBottomSheetSettingsClose}
      />
      <BottomSheetAddWallet
        ref={bottomSheetAddWalletRef}
        onClose={handleBottomSheetAddWalletClose}
      />
    </SafeAreaView>
  );
}
