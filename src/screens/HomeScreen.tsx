import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import Config from 'react-native-config';
import AnimatedBox from '../components/AnimatedBox';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({navigation}: Props) => {
  const navigateToDetails = (itemId: number, title: string) => {
    navigation.navigate('Details', {itemId, title});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to React Native Template</Text>
        <Text style={styles.subtitle}>
          A complete starter template with TypeScript
        </Text>

        <View style={styles.configSection}>
          <Text style={styles.sectionTitle}>Environment Configuration:</Text>
          <Text style={styles.configText}>App Name: {Config.APP_NAME}</Text>
          <Text style={styles.configText}>API URL: {Config.API_URL}</Text>
          <Text style={styles.configText}>
            Debug Mode: {Config.ENABLE_DEBUG === 'true' ? 'ON' : 'OFF'}
          </Text>
        </View>

        <View style={styles.animationSection}>
          <Text style={styles.sectionTitle}>React Native Reanimated Demo:</Text>
          <AnimatedBox />
        </View>

        <View style={styles.navigationSection}>
          <Text style={styles.sectionTitle}>Navigation Demo:</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigateToDetails(1, 'First Item')}>
            <Text style={styles.buttonText}>Go to First Item</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigateToDetails(2, 'Second Item')}>
            <Text style={styles.buttonText}>Go to Second Item</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigateToDetails(3, 'Third Item')}>
            <Text style={styles.buttonText}>Go to Third Item</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  configSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  animationSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  configText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
