public class binary {
    public static void main(String args[]){
        int arr[] = { 1,2,3,4,5};
        int start = 0 ;
        int key = 4 ;
        int end = arr.length- 1;
        for(int i = 0 ; i< arr.length ; i++){
            int mid = (start + end) / 2 ;
            if (mid == key){
                System.out.println("Element found at index: " + mid);
                break;
            }else{
                if(mid > key){
                    end = mid-1;
                }else{
                    start = mid +1 ;
                }
            }
            
        }
    }
    
}
