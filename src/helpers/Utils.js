class Utils {
  /**
   * Compare two arrays
   */
  compareTwoArrays(array1, array2){
    if(JSON.stringify(array1) === JSON.stringify(array2)) { 
      return true;
    } else {
      return false;
    }
  }

  /**
   * Generates a random number from 0 to the limit
   * @param {Int} limit - Max value the random number can be
   * @return {Int}  - random number
   */
  generateARandomNumber(limit){
    return Math.floor(Math.random()*limit);
  }  
}
export default Utils;