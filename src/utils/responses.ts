export default {
  unsucessful: (message: string): IHTTPResponse => ({
    success: false,
    message
  }),
  successful: (message: string, data?: object | undefined): IHTTPResponse => ({
    success: true,
    message,
    data
  }),
  genericError: (): IHTTPResponse => ({
    success: false,
    message: 'Something went wrong while processing your request'
  })
};

interface IHTTPResponse {
  success: boolean;
  message: string;
  data?: object;
}
