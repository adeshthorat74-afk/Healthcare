public class reverse {
    public static void main(String args[]){
        int n = 10899 ;
        while(n > 0){
            int rev = n % 10 ;
            System.out.print(rev+" ");
            n = n / 10 ;
        }
    }
    
}
