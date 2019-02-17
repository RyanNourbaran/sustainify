import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
//import { apiKey } from "../assets/apiKey";
import { Button } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      material: [
        {
          name: "Plastic",
          instructions: "these are instructions @@@ @@@ @@@ @@@"
        },
        {
          name: "Cardboard",
          instructions: "these are instructions @@@ @@@ @@@ @@@"
        }
      ]
    };
  }
  componentDidMount = () => {
    axios({
      method: "get",
      url:
        "https://api.mlab.com/api/1/databases/sustainify/collections/materials?apiKey=",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        const materialArray = this.props.navigation.state.params.materials;
        console.log(materialArray);
        let newMaterials = [];
        let descriptions = response.data;
        for (let i = 0; i < materialArray.length; i++) {
          descriptions.forEach(obj => {
            console.log(obj.name.toLowerCase(), materialArray[i]);

            if (obj.name.toLowerCase() === materialArray[i].toLowerCase()) {
              console.log(obj.instructions);
              newMaterials.push({
                name: obj.name,
                instructions: obj.instructions
              });
            }
          });
        }
        this.setState({ material: newMaterials });
        console.log(newMaterials);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Identified Materials</Text>
        {this.state.material.map((obj, i) => {
          console.log(iconMap, obj.name, iconMap[obj.name]);
          return (
            <View style={styles.itemContainer} key={obj.name + i}>
              <View style={styles.title}>
                <Icon
                  name={iconMap[obj.name] || "social-dropbox"}
                  style={{
                    color: "white",
                    fontSize: 30
                  }}
                />
                <Text style={styles.titleText}>{obj.name}</Text>
              </View>

              <View style={styles.instructions}>
                <Text style={styles.instructionsText}>{obj.instructions}</Text>
              </View>
            </View>
          );
        })}

        <Button
          onPress={() => this.props.navigation.navigate("Tab")}
          style={styles.button}
        >
          <Icon name="home" style={styles.icon} />
        </Button>
        <Button
          onPress={() => this.props.navigation.navigate("Camera")}
          style={styles.button}
        >
          <Icon name="camera" style={styles.icon} />
        </Button>
      </View>
    );
  }
}
const iconMap = {
  Cardboard: "dropbox",
  Plastic: "shopping-bag"
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "linear-gradient(to right, #56ab2f, #a8e063)"
  },
  header: {
    fontSize: 40,
    fontWeight: "500",
    position: "absolute",
    top: 15
  },
  itemContainer: {
    width: "100%",
    margin: 20
  },
  title: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    backgroundColor: "green",
    alignItems: "center"
  },
  titleText: {
    fontSize: 30,
    padding: 10
  },
  instructions: {
    width: "100%",
    padding: 10,
    backgroundColor: "white"
  },
  instructionsText: {
    fontSize: 18
  },
  navButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    height: 90,
    width: 90,
    borderRadius: 45
  },
  icon: {
    color: "rgb(0, 146, 83)",
    fontSize: 70
  }
});
