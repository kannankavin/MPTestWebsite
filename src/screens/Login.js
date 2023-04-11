import React, {useEffect,useState} from 'react';
import {View, Text, KeyboardAvoidingView, Alert, FlatList,SafeAreaView} from 'react-native';
import {useAppDispatch,useAppSelector} from 'src/redux/hooks';
import styles from 'src/styles';
import {Input, Button, Spacer, Loading} from 'src/components';
import {initWebsiteAdd, initWebsiteGet} from 'src/redux/app-saga-actions';
import { Theme } from "src/theme/constants";
import {capitalize} from 'src/utils/constants';

const Login = ({navigation}) => {
  const [website, setWebsite] = useState('');
  const [websites, setWebsites] = useState([
    {
      'id':1,
      'site':'www.go-yubi.com',
      'status':'success'
    },
    {
      'id':2,
      'site':'www.google.com',
      'status':'success'
    },
    {
      'id':3,
      'site':'https://rera.goa.gov.in/reraApp/',
      'status':'failure'
    },
    {
      'id':4,
      'site':'https://www.linkedin.com/',
      'status':'success'
    },
    {
      'id':5,
      'site':'www.yahoo.com',
      'status':'success'
    },
    {
      'id':6,
      'site':'www.sify.com',
      'status':'success'
    },
    {
      'id':7,
      'site':'https://redooeiff.com/',
      'status':'failure'
    },
    {
      'id':8,
      'site':'https://www.facebook.com/',
      'status':'success'
    }
    ,
    {
      'id':9,
      'site':'www.github.com',
      'status':'success'
    },
    {
      'id':10,
      'site':'www.matlab.com',
      'status':'success'
    },
    {
      'id':11,
      'site':'www.gitlab.com',
      'status':'success'
    },
    {
      'id':12,
      'site':'www.clayffin.com',
      'status':'success'
    },
  ]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    //trigger server call to get websites
    const intervalCall = setInterval(() => {
      getData();
    }, 120000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);

  const getData = () =>{
    dispatch(initWebsiteGet(
      {
        "params": {
          "page": page,
        },
        "onSuccess": onSuccessGet,
      }
    ));
  }

  const Website = (txt) => {
    setWebsite(txt);
  }

  onSuccess = (resp) =>{
    setLoading(false);
    if(resp.status){
      //fetched successfully and set websites data array
      //setWebsites(resp.data)
    }
  }

  const onSuccessGet = () =>{

  }

  const submit = () => {
    if(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(website)){
      //trigger server call to add websites
      //setLoading(true); 
      dispatch(initWebsiteAdd(
        {
          "params": {
            "site": website,
          },
          "onSuccess": onSuccess,
        }
      ));
    } else {
      Alert.alert('','Enter a valid website url.')
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View key={item.id} style={styles.FlatListItemSM}>
        <View style={styles.rowContainer}>
          <Text style={[styles.Txt14N,{flex:0.8,flexWrap: 'wrap',color: Theme.colors.text.black}]}>{item.site}</Text>
          <View style={{flex:0.2}}><Button label={capitalize(item.status)} className={item.status === 'failure' ? styles.btnViewRedContainer : styles.btnViewGreenContainer}/></View>
        </View>
      </View>
    )
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
    <SafeAreaView style={styles.container}>
      <View style={{flex:0.25}}>
        <Spacer height={10} />
        <Text style={styles.Txt16BCenter}>{'Monitor Screen'}</Text>
        <Spacer height={10} />
        <View style={styles.viewContainer}>
          <Input placeholder={'Enter website to be monitored here'} value={website} editable={true} onChangeText={Website} maxLength={100}/>
          <Spacer height={20} />
          <Button label={'Add'} onPress={submit} />
        </View>
      </View>
      <View style={{flex:0.75}}>
          <Spacer height={10} />
          <Text style={styles.Txt16BCenter}>{'Websites'}</Text>
          {websites.length ?
              <FlatList
                showsVerticalScrollIndicator={false}
                data={websites}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
          : 
            loading === false ? <View style={styles.viewContainer}><Text style={[styles.Txt16N,{textAlign:'center'}]}>No websites found</Text></View>:null
          }
      </View>
      {loading && <Loading />}
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;