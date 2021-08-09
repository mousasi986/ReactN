import React, {useEffect,useState} from 'react';
import { View, Text, TouchableOpacity,FlatList,ActivityIndicator,Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Axios from 'axios';

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    }
  }

  componentDidMount(){
     Axios
     .get('https://pokeapi.co/api/v2/ability/')
     .then((responseJson) => {
       this.setState({
        isLoading: false,
        dataSource: responseJson
      })
    })
    .catch((error) => {
      console.log(error)
    });

  }

  _renderItem =({item, index}) => {

    return(
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Details',item.name)}>
      <View>
        <Text>{item.name}</Text>
      </View>   
    </TouchableOpacity>
    )
  }

  

  render() {

    let {dataSource, isLoading} = this.state;

    if(isLoading){
      return(
        <View>
          <ActivityIndicator size = 'large' animating/>
        </View>
      )
    }else{

      return (
        <View>
          <FlatList>
            data = {dataSource};
            renderItem = {this._renderItem};
            keyExtractor = {(item,index) => index.toString()}
          </FlatList>
        </View>
      );
    }
    
  }
}

class PockemonScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    }
  }

  componentDidMount(){
     Axios
     .get('https://pokeapi.co/api/v2/ability/',{
       params: {
         offset: 20,
         limit: 20,
         step: 1,
       }
     })
     .then((responseJson) => {
       this.setState({
        isLoading: false,
        dataSource: responseJson
      })
    })
    .catch((error) => {
      console.log(error)
    });

  }

  _renderItem =({item, index}) => {

    return(
      <View>
        <Text>{item.effect_changes, item.effect_entries}</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>   
    )
  }

  render() {

    let {dataSource, isLoading} = this.state;

    if(isLoading){
      return(
        <View>
          <ActivityIndicator size = 'large' animating/>
        </View>
      )
    }else{

      return (
        <View>
          <FlatList>
            data = {dataSource};
            renderItem = {this._renderItem};
            keyExtractor = {(item,index) => index.toString()}
          </FlatList>
        </View>
      );
    }
    
  }
  
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: PockemonScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);