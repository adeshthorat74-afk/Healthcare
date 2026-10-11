public class largestarr {
    public static void main(String args[]){
        int arr[] = { 1, 2,6,3,5};
        int largest = 0 ;
        for(int i = 0 ;  i< arr.length ; i++){
            if(arr[i] > largest){
                largest = arr[i];
            }
        }
        System.out.println("largest value is " + largest);
    }
    
}
