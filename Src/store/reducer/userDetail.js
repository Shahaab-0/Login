const initialState = {
  userName: '',
  email: '',
  id: '',
};

export const userDetail = (state = initialState, action) => {
  if (action.type === 'getUserDetail') {
    const {email, id, userName} = action;
    return {userName, email, id};
  }
  return state;
};
