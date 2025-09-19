declare module 'react-native-onboarding-swiper' {
  import * as React from 'react';
  import { ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native';

  export interface Page {
    backgroundColor: string;
    image: React.ReactNode;
    title: React.ReactNode;
    subtitle: React.ReactNode;
  }

  export interface OnboardingProps {
    pages: Page[];

    // Navigation handlers
    onSkip?: () => void;
    onDone?: () => void;
    onPageChange?: (pageIndex: number) => void;

    // Custom components
    SkipButtonComponent?: React.ComponentType<any>;
    NextButtonComponent?: React.ComponentType<any>;
    DoneButtonComponent?: React.ComponentType<any>;
    DotComponent?: React.ComponentType<any>;

    // Styling props
    containerStyles?: StyleProp<ViewStyle>;
    imageContainerStyles?: StyleProp<ViewStyle>;
    titleStyles?: StyleProp<TextStyle>;
    subTitleStyles?: StyleProp<TextStyle>;
    bottomBarColor?: string;
    bottomBarHeight?: number;
    bottomBarHighlight?: boolean;

    // Dots
    showSkip?: boolean;
    showNext?: boolean;
    showDone?: boolean;
    showPagination?: boolean;

    // Animation / transition
    transitionAnimationDuration?: number;

    // Others
    controlStatusBar?: boolean;
    flatlistProps?: object;
  }

  export default class Onboarding extends React.Component<OnboardingProps> {}
}
