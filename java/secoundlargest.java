public class secoundlargest{
    public static void main (String args[]){
        int arr[] = { 23,43,54,21,54,12};
        int largest = arr[0];
        int secondLargest = arr[0];
        for(int i = 0 ; i< arr.length ; i++){
          if(arr[i]>largest){
       
          largest =arr[i];
          }
        }
        for(int i = 0; i< arr.length ;i++){
            if(arr[i]>secondLargest && arr[i]!=largest){
                secondLargest =arr[i];
            }
        }
        System.out.println("Largest element is: " + largest);
       
        System.out.println("Second largest element is: " + secondLargest);
    }

}