
import java.util.Scanner;

public class income {
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        int income = sc.nextInt();
        if(income < 50000){
            System.out.print("no tax");
        }else if(income >= 50000 && income < 100000){
            System.out.print("tax is 20%" + income * 0.2);
        }else{
            System.out.println("income in 30 %" +  income * 0.3);
        }
        }
    }

