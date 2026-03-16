type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const resSuccess = <T>(data: T): ActionResponse<T> => {
  return {
    success: true,
    data
  };
};

export const resError = (message: string): ActionResponse => {
  return {
    success: false,
    error: message
  };
};
