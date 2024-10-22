class Utils {

  /**
   * Compare two arrays
   */
  compareTwoArrays(array1, array2){
    if(JSON.stringify(array1) === JSON.stringify(array2))
      { return true;
      }
      else{
        return false;
      }
    }
}export default Utils;