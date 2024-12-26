
# Welcome-Page-App

Welcome to the **Welcome-Page-App**, a welcome page designed for a mobile app that is compatible with iOS and Android. This app makes use of several modern technologies to ensure a seamless user experience and efficient mobile compatibility.

## Technologies Used

- **Material Design 3**: For UI principles, ensuring a consistent and intuitive design system.
- **Angular 19**: For managing the app’s structure and data flow.
- **Angular Material 19**: For pre-built UI components such as buttons, inputs, dialogs, and more.
- **Ionic & CapacitorJS**: For cross-platform mobile compatibility, allowing the app to run natively on iOS and Android.
- **Docker**: For containerization and easy deployment.

## Project Structure

The app consists of several components and modules for different functionalities, structured as follows:

- **app.component.html, app.component.scss, app.component.ts**: These files define the main app structure and styling.
- **Login**:
  - **login.component.html**
  - **login.component.scss**
  - **login.component.ts**: Implements user authentication (login) using Swagger API.
- **Signup**:
  - **signup.component.html**
  - **signup.component.scss**
  - **signup.component.ts**: Implements user registration using Swagger API.
- **Home**:
  - **home.component.html**: Displays the full-screen animation.
  - **home.component.scss**: Styling for the home page.
  - **home.component.ts**: Manages animation and other related functionalities.

## Features

- **Animation**: A simple, interactable animation created using **Spline**, displayed on the Welcome page.
- **Authentication**:
  - Sign Up tab: For user registration.
  - Login tab: For user authentication.
  - Both **Login** and **Sign Up** features are implemented using APIs provided by the **Swagger** JSON file. It contains the necessary endpoints for user authentication (simplified integration).

## Running the Application

Follow the instructions below to run the app locally for both web and mobile versions.

### Running the Web Application Locally:

1. Clone this repository:

```bash
git clone https://github.com/pamplozio/challenge-welcome-page-app.git
cd challenge-welcome-page-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the application:

```bash
ng serve
```

You can access the app at [http://localhost:4200](http://localhost:4200).

### Running on Mobile Using Capacitor:

1. Install Ionic and CapacitorJS:

```bash
npm install -g @ionic/cli @capacitor/core @capacitor/cli
```

2. Build the app for mobile:

```bash
ionic build
```

3. Sync the app with Capacitor:

```bash
ionic cap sync
```

4. Open it in your preferred native IDE (Xcode for iOS or Android Studio for Android):

```bash
ionic cap open ios
# or
ionic cap open android
```

### AI Interactions
Some of the instructions for developing and structuring this project were generated with the assistance of ChatGPT. These resources helped provide guidance for various aspects of the project:

- [Instruction 1](https://chatgpt.com/share/676d9a51-3168-8005-887c-0ed111f96f38)
- [Instruction 2](https://chatgpt.com/share/676d9bda-6f48-8005-b647-3fe538c1b5b0)
- [Instruction 3](https://chatgpt.com/share/676d9c1a-0f94-8005-96f7-c44234aca7e2)
- [Instruction 4](https://chatgpt.com/share/676d9c4e-ff38-8005-bf44-dc764e6b9cb7)

### GitHub Repository
Clone the repository for your local development:

```bash
git clone https://github.com/pamplozio/challenge-welcome-page-app.git
```

