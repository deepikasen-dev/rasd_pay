/**
 * @file src/screens/Onboarding/index.tsx
 * @description Screen component rendered within app navigation.
 * @lastUpdated 2025-09-19T11:33:09.034Z
 */

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useStatusBarColor } from '../../context';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../utils/colors';
import otherStrings from '../../utils/otherStrings';
import { hp } from '../../utils/globalUse';
import CustomButton from '../../components/CustomButton';
import Routes from '../../utils/Routes';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: otherStrings.welcomeMessage,
    subtitle: otherStrings.description1,
    image: require('../../assets/pngs/Onboarding1.png'),
  },
  {
    id: '2',
    title: otherStrings.description2,
    subtitle: otherStrings.description3,
    image: require('../../assets/pngs/Onboarding2.png'),
  },
  {
    id: '3',
    title: otherStrings.description4,
    subtitle: otherStrings.description5,
    image: require('../../assets/pngs/Onboarding3.png'),
  },
];

const OnboardingScreen = ({ navigation }: any) => {
  const { setColor } = useStatusBarColor();
  useFocusEffect(
    React.useCallback(() => {
      setColor(colors.lightBG);

      return () => {
        setColor(colors.lightBG); // Reset when unmounted
      };
    }, []),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace(Routes.GET_STARTED); // Go to home after last slide
    }
  };

  const handleSkip = () => {
    navigation.replace(Routes.GET_STARTED);
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.slide, { width }]}>
      <Image source={item.image} style={styles.image} />
      <View style={{ backgroundColor: colors.bg }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Skip button at top-right */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* FlatList for swiping */}
      <FlatList
        data={slides}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        ref={flatListRef}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {/* Pagination dots at top-left */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                opacity: index === currentIndex ? 1 : 0.3,
                width: index === currentIndex ? 20 : 8,
              },
            ]}
          />
        ))}
      </View>

      {/* Next / Done button at bottom */}
      {/* <TouchableOpacity onPress={ handleNext }>
                <Text style={ styles.nextText }>
                    { currentIndex === slides.length - 1 ? otherStrings.getStarted :otherStrings.next }
                </Text>
            </TouchableOpacity> */}
      <View style={styles.nextButton}>
        <CustomButton
          title={
            currentIndex === slides.length - 1
              ? otherStrings.getStarted
              : otherStrings.next
          }
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBG,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: width * 0.9,
    height: height * 0.5,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: '#333',
  },
  dotsContainer: {
    position: 'absolute',
    top: 45,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
  nextButton: {
    position: 'absolute',
    bottom: 40,
    left: 10,
    right: 10,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
