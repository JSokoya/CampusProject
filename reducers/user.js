import {
  SAVE_IMAGES,
  CURRENT_USER,
  ALL_USERS,
  IMAGE_INDEX,
  NEWS_FEED_IMAGES
} from '../utilities/keys';

const initialState = {
  images: [],
  currentUser: {},
  users: {},
  index: 0,
  newsFeed: []
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SAVE_IMAGES:
      return { ...state, images: [...initialState.images, action.image] };
    case CURRENT_USER:
      return { ...state, currentUser: action.user };
    case ALL_USERS:
      return { ...state, users: action.users };
    case IMAGE_INDEX:
      return { ...state, index: action.index };
    case NEWS_FEED_IMAGES:
      return { ...state, newsFeed: [...initialState.newsFeed, action.object] };
    default:
      return state;
  }
}
