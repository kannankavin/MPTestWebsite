import React,{useEffect,createRef} from 'react';
import {
  NavigationContainer
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from 'src/redux/hooks';
import Login from 'src/screens/Login.js'

const Stack = createNativeStackNavigator()
const navigationRef = createRef()
const nav = () => navigationRef.current
const MainStackNavigator = () => {
  const {PERSIST_REDUCER} = useAppSelector(state => state);

  useEffect(() => {
    console.log("PERSIST_REDUCER" , PERSIST_REDUCER)
  }, []);

  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={"Login"}
          screenOptions={{
              headerShown: false,
              header: ({navigation, route, options, back}) => {
                return (
                  <Header 
                    navigation={navigation}
                    route={route}
                    options={options}
                    back={back}
                    isSecureNav={false}
                  />
                );
              },
            }}
        >
          <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default MainStackNavigator