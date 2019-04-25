import {
  SAVE_IMAGES,
  CURRENT_USER,
  ALL_USERS,
  IMAGE_INDEX,
  NEWS_FEED_IMAGES
} from '../utilities/keys';

export function saveImages(image) {
  return {
    type: SAVE_IMAGES,
    image
  };
}

export function setCurrentUser(user) {
  return {
    type: CURRENT_USER,
    user
  };
}

export function saveAllUsers(users) {
  return {
    type: ALL_USERS,
    users
  };
}

export function increaseImageIndex(index) {
  return {
    type: IMAGE_INDEX,
    index
  };
}

export function newsFeed(object) {
  return {
    type: NEWS_FEED_IMAGES,
    object
  };
}
