public class Bi {
public static void main(String[] args){

    int arr[] ={2,4,6,8,10,12,14};
    
    int start = 0 ;
    int end = arr.length-1;
   
    int key = 10;
    while(start <=end){
     int mid = (start +end)/2;
    if (key == arr[mid]) {
        System.out.println("this is a key at index "  +mid);
        break;
    } else if(key <arr[mid]){
        end = mid-1;
    }else{
        start = mid+1;
    }
}
    
}
}
