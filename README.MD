# 🚀 Expo - Firebase - Kit

Welcome to the **Expo - Firebase - Kit** repository! This project is a starter kit built with React Native Expo, designed to get you up and running with Expo Router v3, Gluestack-UI, and Firebase for authentication.

## Maintainer

👤 **Eray Siltu**

## Description

This starter kit is built with React Native Expo, using Expo Router v3, Gluestack-UI, and TypeScript. It integrates Firebase for a seamless authentication experience:

- 🔐 **SignIn & SignUp**: User authentication made easy.
- 🔄 **Auth Check on App Rendering**: Ensure users are authenticated on each app load.
- 🗂 **Tabs with Drawer Navigation**: Smooth navigation for authenticated users.
- 📧 **Email Verification**: Secure your app with email verification.
- 🎨 **Choose App Icon**: Standard 3 app icons for users to select.

Currently under maintenance, so updates will follow!

## 📚 Table of Contents

- [🛠 Tech Stack](#-tech-stack)
- [📥 Installation](#-installation)
- [📈 Usage](#-usage)
- [📄 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)

## 🛠 Tech Stack

- **Firebase**: For authentication flow ([Firebase site](https://firebase.google.com/))
- **Expo Router**: For navigation logic ([Expo Router Documentation](https://docs.expo.dev/router/introduction/))
- **Gluestack-UI**: For UI components ([Gluestack-UI](https://gluestack.io/))
- **Custom Fonts**: From Google 😎
- **TypeScript with React Native**: Created with ([Create Expo Stack](https://createexpostack.com/))
- **MMKV Storage**: For storing, retrieving, and deleting data ([MMKV](https://github.com/mrousavy/react-native-mmkv))

## 📥 Installation

To set up the project locally, you will need to install the necessary dependencies. This project uses Yarn as the package manager.

1. Clone the repository:
    ```sh
    git clone https://github.com/esiltu/expo-firebase-auth
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

## 📄 Project Structure

The app includes the following pages and flow structure:

1. **SignIn Page**: The initial screen for user login.
2. **SignUp Page**: For new users to create an account.
3. **Dashboard**: Contains tab and drawer navigation.
    - **Tabs**:
        - 🏠 **Home**: Default tab.
        - 💼 **Jobs**: View available job listings.
        - 📅 **Scheme**: Manage your schedule.
        - 👤 **Profile**: User profile and settings page.
    - **Drawer**:
        - 🎨 **Choose App Icon**: Select from 3 standard icons.
        - 📁 **Files Flex**: Manage files within the app.
        - ⚙️ **Profile/Settings**: Access and update user settings.

```mermaid
graph TD
    A[SignIn Page] -->|Existing User| B[Dashboard]
    A -->|New User| C[SignUp Page]
    C --> B
    B --> D[Home Tab]
    B --> E[Jobs Tab]
    B --> F[Scheme Tab]
    B --> G[Profile Tab]
    G --> I[Profile/Settings]
    B --> J[Drawer Navigation]
    J --> K[Choose App Icon]
    J --> L[Files Flex]
    J --> I
