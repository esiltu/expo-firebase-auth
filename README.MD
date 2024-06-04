# 🚀 Expo - Firebase - Kit

Welcome to the **Expo - Firebase - Kit** repository! This project is a starter kit built with React Native Expo, designed to get you up and running with Expo Router v3, Gluestack-UI, and Firebase for authentication.

## Maintainer

👤 **Eray Siltu**

## Description

This starter kit is built with React Native Expo, using Expo Router v3, Gluestack-UI, and TypeScript. It integrates Firebase for authentication, including SignIn, SignUp, auth check on app rendering, tabs with drawer navigation for authenticated users, and email verification. Currently under maintenance, so updates will follow!

## 📚 Table of Contents

- [🛠 Tech Stack](#-tech-stack)
- [📥 Installation](#-installation)
- [📈 Usage](#-usage)
- [🤝 Contributing](#-contributing)

## 🛠 Tech Stack

- **Firebase**: For authentication flow
- **Expo Router**: For navigation logic ([Expo Router Documentation](https://docs.expo.dev/router/introduction/))
- **Gluestack-UI**: For UI components ([Gluestack-UI](https://gluestack.io/))
- **Custom Fonts**: From Google 😎
- **TypeScript with React Native**: Created with [Create Expo Stack](https://createexpostack.com/)

## 📥 Installation

To set up the project locally, you will need to install the necessary dependencies. This project uses Yarn as the package manager.

1. Clone the repository:
    ```sh
    git clone https://github.com/esiltu/VacatureShift-V1
    cd your-repo-name
    ```

2. Install the dependencies:
    ```sh
    yarn install
    ```

## 📈 Usage

This is a development build application, so you will need to make development builds for both iOS and Android manually.

1. Create a development build for iOS and Android:
    ```sh
    npx expo prebuild
    ```

2. The project uses a `.env` file for storing secret Firebase keys. Ensure you have your Firebase keys set up in the `.env` file with the following variables:
    ```env
    EXPO_PUBLIC_FIREBASE_API_KEY=
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
    EXPO_PUBLIC_DATABASE_URL=
    EXPO_PUBLIC_PROJECT_ID=
    EXPO_PUBLIC_STORAGE_BUCKET=
    EXPO_PUBLIC_MESSAGING_SENDER_ID=
    EXPO_PUBLIC_APP_ID=
    EXPO_PUBLIC_MEASUREMENT_ID=
    ```

## 🤝 Contributing

Contributions are welcome! If you would like to contribute to the project, please fork the repository and create a pull request. More features are coming soon!
