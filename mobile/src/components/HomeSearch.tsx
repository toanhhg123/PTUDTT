import Icons from "@expo/vector-icons/MaterialIcons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomBackdrop from "./CustomBackdrop";
import FilterView, { FilterHome } from "./FilterView";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  search: string;
  onSearch: (value: string) => void;
  onFilter?: (filter: FilterHome) => void;
  onReset?: () => void;
}

export default function HomeSearch({
  search,
  onSearch,
  onFilter,
  onReset,
}: Props) {
  const { colors } = useTheme();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 24,
          gap: 12,
          flex: 1,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 1,
            flex: 1,
            paddingHorizontal: 24,
            height: 52,
            borderColor: colors.border,
            borderRadius: 52,
            alignItems: "center",
            flexDirection: "row",
            gap: 12,
          }}
        >
          <Icons name="search" size={24} color={colors.border} />
          <TextInput
            placeholder=" Search..."
            onChangeText={onSearch}
            value={search}
            style={{
              color: colors.text,
              opacity: 0.5,
              fontSize: 16,
              flex: 1,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePresentModalPress}
          style={{
            borderWidth: 1,
            width: 52,
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.primary,
            borderRadius: 52,
          }}
        >
          <Icons name="tune" size={24} color={colors.background} />
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        snapPoints={["85%"]}
        index={0}
        ref={bottomSheetModalRef}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.card,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <FilterView
          onFilter={(filter) => {
            onFilter && onFilter(filter);
            bottomSheetModalRef.current?.present();
          }}
          onReset={() => {
            onReset && onReset();
            bottomSheetModalRef.current?.present();
          }}
        />
      </BottomSheetModal>
    </>
  );
}
