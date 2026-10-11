public class l{
    public static void main(String[] args) {

        int arr[] = {1, 4, 2, 3, 5};

        int largest = arr[0];   // First element ko largest maan lo

        for (int i = 1; i < arr.length; i++) {
            if (largest < arr[i]) {
                largest = arr[i];
            }
        }

        System.out.println("Largest element is: " + largest);
    }
}
