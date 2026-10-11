public class reveres {
    public static void main(String args[]){
        int arr[] = {1,2,3,4,5};
        for(int i= arr.length-1; i>=0 ;i--){
            for(int j = i+1 ; j< arr.length ;j++){
                 System.out.print(arr[i] + ", "+arr[j]);
            }
           
        }
    }
    
}
