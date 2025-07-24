class ApiResponse {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.status = statusCode >= 400 ? "error" : "success";
  }
}

export default ApiResponse;
