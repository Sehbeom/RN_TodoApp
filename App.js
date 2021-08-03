import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';
// 직접 정의한 각각의 컴포넌트들을 import 해온다. 
import Header from './app/components/Header';
import Subtitle from './app/components/Subtitle';
import Input from './app/components/Input';
import Listitem from './app/components/Listitem';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      inputValue : "",
      todos:[
      ]
    }
  }

  storeData = () =>{
    AsyncStorage.setItem('@todo:state',JSON.stringify(this.state));
  }

  getData = () => {
    AsyncStorage.getItem('@todo:state').then((state)=>{
      if(state !== null){
        this.setState(JSON.parse(state));
      }
    })
  }

  componentWillMount(){
    this.getData();
  }

  _makeTodoItem = ({item, index}) => {
    return (
      <Listitem 
      name = {item.title}
      isComplete = {item.iscomplete}
      changeComplete = {() => {
        // const newTodo = this.state.todos;
        item.iscomplete = !item.iscomplete;
        this.setState({},this.storeData)
      }}
      deleteItem = {() => {
        const newTodo = [...this.state.todos];
        newTodo.splice(index,1);
        this.setState({
          todos : newTodo
        },this.storeData)
      }}/>
    )
  }

  _changeValue = (value) => {
    this.setState({
      inputValue : value
    });
  }

  _addTodoItem = () => {
    const prevTodo = this.state.todos;
    const newTodo = {title : this.state.inputValue, iscomplete : false};

    if(this.state.inputValue !== ""){
      this.setState({
        inputValue:"",
        todos:prevTodo.concat(newTodo),
      },this.storeData)
    }
  }

  render(){
  return (
    //화면 전체를 감싸는 View 컴포넌트
    <View style={styles.container}>
      {/* 헤더를 감싸는 View 컴포넌트 */}
      <View style={styles.headercenter}>
        <Header />
      </View>

      {/* 서브타이틀과 Input을 감싸는 View 컴포넌트 */}
      <View style={styles.subtitleposi}>
        <Subtitle title="해야 할 일"/>
        <Input
          value = {this.state.inputValue}
          changeValue = {this._changeValue}
          addTodoItem ={this._addTodoItem}/>
      </View>

      {/* 서브타이틀과 리스트아이템을 감싸는 View 컴포넌트 */}
      <View style={styles.subtitleposi}>
      <Subtitle title="해야 할 일 목록"/>
        <FlatList
          data = {this.state.todos}
          renderItem = {this._makeTodoItem}
          keyExtractor = {(item,index)=>{return `${index}`}}/>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headercenter: {
    alignItems:"center",
  },

  subtitleposi:{
    marginLeft:50,
  }
});
