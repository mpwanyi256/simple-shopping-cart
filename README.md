# A simple shopping cart

This simple project illustrates how we can take advantage of the [redux-toolkit](https://redux-toolkit.js.org/) to manage Application state.

We are fetching a list of shopping cart items that we display to the user which they can later play around with by increasing or reducing the quantities of items that are already added to the cart.

#### Installing redux-toolkit to a new or existing React app

- New app

  ```sh
  npx create-react-app my-app --template redux
  ```

- @latest

```sh
npx create-react-app@latest my-app --template redux
```

- Existing App
  ```sh
  npm install @reduxjs/toolkit react-redux
  ```

#### @reduxjs/toolkit

## consists of few libraries

- redux (core library, state management)
- immer (allows to mutate state)
- redux-thunk (handles async actions)
- reselect (simplifies reducer functions)

#### Extra tools

- redux devtools
- combine reducers
