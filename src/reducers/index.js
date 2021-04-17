const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 400
};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };

    case 'BOOK_ADDED_TO_CART':
      const bookId = action.payload;
      const book = state.books.find((item, idx) => item.id === bookId);
      const { id, title, price } = book;
      const newItem = {
        id,
        title,
        count: 1,
        total: price
      };
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          newItem
        ]
      };

    default:
      return state;
  }

};

export default reducer;