import React, { Component } from 'react';
import { Text, StyleSheet, View, Modal, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import { Input, Header } from 'react-native-elements';

import firebase from 'firebase';
import db from '../config';

export default class SignUpLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            emailID: "",
            password: "",
            confirmPassword: "",
            isModalVisible: false,
            firstName: "",
            lastName: "",
            userName: ""
        }
    }

    SignUp = (emailID, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("Your Passwords do not match\nPlease try again");
        } else {
            firebase.auth().createUserWithEmailAndPassword(emailID, password)
                .then(() => {
                    db.collection("users").add({
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        email: this.state.emailID,
                        username: this.state.userName
                    });
                    return Alert.alert("Signed Up Successfully!\nLogin to continue");
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage);
                });
        };
    };

    LogIn = (emailID, password) => {
        firebase.auth()
            .signInWithEmailAndPassword(emailID, password)
            .then(() => {
                this.props.navigation.navigate("MainScreen");
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            });
    };

    showModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.isModalVisible}
            >
                <ScrollView>
                    <View style={styles.signupView}>
                        <Text style={styles.headText}>SIGN UP</Text>
                    </View>
                    <View style={{ flex: 0.95 }}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput style={styles.formInput}
                            placeholder={"First Name"}
                            maxLength={15}
                            onChangeText={(text) => {
                                this.setState({ firstName: text });
                            }}
                        />
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style={styles.formInput}
                            placeholder={"Last Name"}
                            maxLength={15}
                            onChangeText={(text) => {
                                this.setState({ lastName: text });
                            }}
                        />
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.formInput}
                            placeholder={"Email"}
                            keyboardType={"email-address"}
                            onChangeText={(text) => {
                                this.setState({ emailId: text });
                            }}
                        />
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.formInput}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({ password: text });
                            }}
                        />

                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.formInput}
                            placeholder={"Confrim Password"}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    confirmPassword: text,
                                });
                            }}
                        />
                    </View>
                    <View style={{ flex: 0.2, alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                this.SignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                            }
                            }
                        >
                            <Text style={{ alignSelf: "center", marginTop: 3 }}>Register</Text>
                        </TouchableOpacity>
                        <Text
                            style={{ alignSelf: "center", marginTop: 3 }}
                            onPress={() => { this.setState({ isModalVisible: false }) }}
                        >
                            Cancel
                    </Text>
                    </View>
                </ScrollView>
            </Modal>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Header
                        containerStyle={{ backgroundColor: '#393e46', height: 65 }}
                        centerComponent={{ text: 'Image Recogniser', style: { color: '#eeeeee', marginTop: 8, fontWeight: "bold" } }}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.headText}>Your Email Address</Text>
                    <Input
                        style={styles.input}
                        placeholder="email@address.com"
                        placeholderTextColor={"#eeeeee"}
                        placeholderStyle={{ opacity: 0.4 }}
                        leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#00adb5' }}
                        onChangeText={(text) => { this.setState({ emailID: text }) }}
                        keyboardAppearance={"dark"}
                        keyboardType={"email-address"}
                    />
                    <Text style={styles.headText}>Password</Text>
                    <Input
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={"#eeeeee"}
                        leftIcon={{ type: 'font-awesome', name: 'lock', color: '#00adb5' }}
                        onChangeText={(text) => { this.setState({ password: text }) }}
                        keyboardAppearance={"dark"}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.LogIn(this.state.emailID, this.state.password)}>
                    <Text style={{
                        alignSelf: "center", marginTop: 3, fontSize: 14
                    }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={() => { this.setState({ isModalVisible: true }) }}>
                    <Text style={{
                        alignSelf: "center", marginTop: 3, fontSize: 14
                    }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831'
    },

    inputView: {
        justifyContent: "center"
    },

    signupView: {
        flex: 0.05,
        justifyContent: 'center',
        alignItems: 'center'
    },

    headText: {
        fontWeight: "700",
        fontSize: 15,
        alignSelf: "auto",
        color: '#eeeeee',
        marginLeft: 13,
        justifyContent: "center"
    },

    label: {
        fontWeight: "500",
        alignSelf: "auto",
        color: '#eeeeee',
        justifyContent: "center"
    },

    input: {
        height: 15,
        width: 80,
        alignSelf: "center",
        color: '#eeeeee',
    },

    button: {
        width: 80,
        height: 30,
        color: '#eeeeee',
        alignSelf: "center",
        borderRadius: 7,
        backgroundColor: '#00adb5',
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 16,
        shadowOffset: {
            width: 0,
            height: 8,
        }
    }
}) 