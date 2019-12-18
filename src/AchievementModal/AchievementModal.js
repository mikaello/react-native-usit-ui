// @flow
import React from 'react';
import { Image, View, TouchableOpacity, Modal } from 'react-native';
import { Banner } from '../svg-icons';
import CustomText from '../CustomText';

import { colors, constants } from '../styles';

type Props = {
  bannerTitle: string,
  bannerColor: {
    primary: string,
    secondary: string,
    tertiary: string,
  },
  icon: React.Component<*>,
  title: string,
  description: string,
  visible: boolean,
  onClose: () => void,
  closeText: string,
  closeTextColor: string,
  animationType: 'none' | 'slide' | 'fade',
};

class AchievementModal extends React.Component<Props> {
  static defaultProps = {
    animationType: 'fade',
    bannerTitle: 'Thank you!',
    bannerColor: {
      primary: '#008187',
      secondary: '#0E5956',
      tertiary: '#36A3A0',
    },
    icon: (
      <Image
        source={require('./star.png')}
        style={{
          marginTop: 10,
          height: 90,
          width: 90,
        }}
        resizeMode="contain"
      />
    ),
    title: 'Well done!',
    description: 'You have answered all of the questions for today!',
    closeText: 'Close',
    closeTextColor: '#008187',
    visible: false,
  };
  render() {
    const {
      bannerTitle,
      bannerColor,
      icon,
      title,
      description,
      closeText,
      visible,
      onClose,
      closeTextColor,
      animationType,
    } = this.props;
    return (
      <Modal
        transparent
        visible={visible}
        onRequestClose={() => onClose()}
        animationType={animationType}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4A4A4AAA',
          }}
        >
          <Banner
            primary={bannerColor.primary}
            secondary={bannerColor.secondary}
            tertiary={bannerColor.tertiary}
            bannerTitle={bannerTitle}
          />
          <View
            style={{
              backgroundColor: 'white',
              width: 240,
              height: 270,
              borderBottomLeftRadius: constants.borderRadius,
              borderBottomRightRadius: constants.borderRadius,
            }}
          >
            <View
              style={{
                flex: 0.82,
                justifyContent: 'space-around',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: colors.gray,
              }}
            >
              {icon}
              <CustomText
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
                }}
              >
                {title}
              </CustomText>

              <CustomText
                style={{
                  width: 200,
                  marginBottom: 10,
                  textAlign: 'center',
                }}
              >
                {description}
              </CustomText>
            </View>
            <TouchableOpacity
              onPress={() => onClose()}
              style={{
                flex: 0.18,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CustomText style={{ color: closeTextColor, fontSize: 16 }}>
                {closeText}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default AchievementModal;
