import { useState, useRef } from "react";
import { Text, FlatList, View, Animated ,StyleSheet} from "react-native";
import OnboardingItem from "./OnboardingItem";
import slices from "../data/slices";

export default Onboarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewableItemChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const slidesRef = useRef(null);
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slices}
          renderItem={({ item }) => {
            return <OnboardingItem item={item} />;
          }}
          keyExtractor={(item) => item.id}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemChanged}
          ref={slidesRef}
        />
      </View>
    </View>
  );
};
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
})
