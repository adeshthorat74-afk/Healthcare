import java.util.*;

public class ades {
    public static void main(String args[]) {
        int marks[] = new int[50];
        Scanner sc = new Scanner(System.in);

        marks[0] = sc.nextInt();
        marks[1] = sc.nextInt();

        System.out.println(marks[0] + " " + marks[1]);

        sc.close();
    }
}