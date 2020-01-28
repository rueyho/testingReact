import jwtDecode from "jwt-decode";

export default new (class TokenUtil {
  decode(token) {
    try {
      return jwtDecode(token);
    } catch (e) {
      console.log("TokenUtil : decode : [EXCEPTION] , ", e);
      return null;
    }
  }
})();
