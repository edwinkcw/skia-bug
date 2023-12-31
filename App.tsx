import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Canvas, Image, useImage} from '@shopify/react-native-skia';
import React from 'react';
import {Dimensions, StyleSheet, useWindowDimensions, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {SceneMap, TabView, TabBar} from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={{flex: 1, backgroundColor: 'transparent'}} />
);

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: 'transparent'}} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Main}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

function Main(): React.JSX.Element {
  const imageLight = useImage(require('./body_bg.png'));
  const imageDark = useImage(require('./body_bg_dark.png'));
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const image = index === 0 ? imageLight : imageDark;
  const [routes] = React.useState([
    {key: 'first', title: 'Tab 1'},
    {key: 'second', title: 'Tab 2'},
  ]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Canvas
        style={{
          position: 'absolute',
          left: 0,
          top: 1,
          width: '100%',
          height: '100%',
        }}>
        {image && (
          <Image
            image={image}
            fit="cover"
            x={0}
            y={0}
            width={Dimensions.get('window').width}
            // height={100}
            height={
              (Dimensions.get('window').width * image.height()) / image.width()
            }
          />
        )}
      </Canvas>
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{
              backgroundColor: 'transparent',
              borderBottomColor: 'white',
              borderBottomWidth: 1,
            }}
            labelStyle={{
              color: 'white',
              fontWeight: '500',
              fontSize: 14,
              textTransform: 'none',
            }}
            indicatorStyle={{backgroundColor: 'white', height: 5}}
          />
        )}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
}

export default App;
