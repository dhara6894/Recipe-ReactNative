import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Image,TouchableOpacity } from 'react-native';
import ImageLoad from 'react-native-image-placeholder';

export default class RecipeListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      like:false,
      dataSource: []
    };
  }
  handleHeartTapped = async () => {
    console.log("image tapped")
    this.setState({
      like: !(this.state.like)
    })
    
  }
  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    fetch('http://35.160.197.175:3006/api/v1/recipe/feeds', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s'
      },
    })
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator style={{
            justifyContent: 'center'
          }} size="large" color="blue" animating={this.state.isLoading} />
        </View>
      )
    }

    return (
      <View style={styles.container}>

        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) =>
            <View style={styles.containerStyle}>
              <ImageLoad
                style={styles.imageContainer}
                placeholderStyle={styles.placeHolder}
                customImagePlaceholderDefaultStyle={styles.placeHolder}
                source={{
                  uri: (item.photo == null) ? "" : item.photo
                }}
                placeholderSource={require('/Users/dhara.patel/Documents/Project/ReactProject/FirstDemoApp/assets/images/fork.png')}
              >
                 
                <View style={styles.heartIconContainer} >
                <TouchableOpacity  onPress={ this.handleHeartTapped }>
                  <View>
{
                  (this.state.like) ? <Image style={styles.inlineImage} source={
                    require( '/Users/dhara.patel/Documents/Project/ReactProject/FirstDemoApp/assets/images/like.png') } />  :
                    <Image style={styles.inlineImage} source={
                      require('/Users/dhara.patel/Documents/Project/ReactProject/FirstDemoApp/assets/images/unlike.png') } />  

}                    
                  </View>
                    
                  </TouchableOpacity>
                </View>
                
                <View style={styles.overlay}>

                  <Text style={styles.recipeNameText}>{item.name}</Text>
                  <View style={styles.textImageContainer}>

                    <View style={styles.firstTextImage}>
                      <Image style={styles.inlineImage} source={require('/Users/dhara.patel/Documents/Project/ReactProject/FirstDemoApp/assets/images/clock.png')} />
                      <Text style={{ color: 'white' }} >{item.preparationTime}</Text>
                    </View>
                    <View style={styles.secondTextImage}>
                      <Image style={styles.inlineImage} source={require('/Users/dhara.patel/Documents/Project/ReactProject/FirstDemoApp/assets/images/favorite.png')} />
                      <Text style={{ color: 'white' }}>{(item.complexity == "" ? "Medium" : item.complexity)}</Text>
                    </View>
                    <View style={styles.thirdTextImage} >
                      <Image style={styles.inlineImage} source={require('/Users/dhara.patel/Documents/Project/ReactProject/FirstDemoApp/assets/images/group.png')} />
                      <Text style={{ color: 'white' }}>{item.serves + " People"}</Text>
                    </View>
                  </View>
                </View>
              </ImageLoad>
              {/* <View style={{ height: 60, padding: 5 }}>
                <Text style={styles.recipeNameText}>{item.name}</Text>
                <View style={styles.textImageContainer}>

                  <View style={styles.firstTextImage}>
                    <Image style={styles.inlineImage} source={require('/Users/dhara.patel/Documents/Project/ReactProject/FirstDemoApp/assets/images/clock.png')} />
                    <Text>{item.preparationTime}</Text>
                  </View>
                  <View style={styles.secondTextImage}>
                    <Image style={styles.inlineImage} source={require('/Users/dhara.patel/Documents/Project/ReactProject/FirstDemoApp/assets/images/favorite.png')} />
                    <Text>{(item.complexity == "" ? "Medium" : item.complexity)}</Text>
                  </View>
                  <View style={styles.thirdTextImage} >
                    <Image style={styles.inlineImage} source={require('/Users/dhara.patel/Documents/Project/ReactProject/FirstDemoApp/assets/images/group.png')} />
                    <Text>{item.serves + " People"}</Text>
                  </View>
                </View>
              </View> */}
            </View>
          }
          keyExtractor={item => item.recipeId.toString()}
        />
      </View>
    );

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heartIconContainer: {
    top: 10,
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  recipeNameText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: "center",
    color: 'white',
    marginTop: 5
  },
  inlineImage: {
    width: 20, height: 20, marginRight: 10
  },
  textImageContainer: {
    flex: 1,
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    marginBottom: 5
  },
  firstTextImage: {
    flex: 1,
    width: 100,
    height: 30,
    marginRight: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  secondTextImage: {
    flex: 1,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  thirdTextImage: {
    flex: 1,
    width: 100,
    height: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 5,
    alignContent: 'center',
    flexDirection: 'row',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  imageContainer: {
    flex: 1,
  },
  placeHolder: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  containerStyle: {
    height: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 25,
  },
  overlay: {
    position: 'absolute',
    top: 140,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.4
  }
})