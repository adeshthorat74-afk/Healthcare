public class s{
    public static void selectionsort(int arr[]){
        for (int i = 0; i< arr.length-1 ; i++){
            int min = i ;
            for(int j = i+1 ;j <arr.length ;j++){
                if (arr[j]<arr[min]){
                    min = j ;
                }
            }
            int temp =arr[min];
            arr[min] = arr[i];
            arr[i] = temp ;
        }
    }
    public static void Array(int arr[]){
        for (int i = 0 ; i< arr.length ;i++){
            System.out.println(arr[i]+" ");
        }
    }
    public static void main(String[] args){
        int arr[] = {2,1,3,5,4};
        selectionsort(arr);
        Array(arr);

    }
}