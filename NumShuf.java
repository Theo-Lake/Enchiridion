import java.util.Random;
import java.util.Scanner;

public class NumShuf {

    public static void main(String[] args) {
        
        Scanner scnr = new Scanner (System.in);
        Random random = new Random();
        int boxLength;
        

        System.out.println("How many numbers do you have?: ");
        boxLength = scnr.nextInt();
        
        int box [] = new int[boxLength];
        boolean reset = true;
        int num;
        //defining variables and the array
        while (reset) {
            // creating a while loop so that if the user wants to change their nums later on, they just type no and it returns here.
            System.out.println("Please state your numbers: ");
            for (int i = 0; i < box.length; i++) {
             num = scnr.nextInt();
             box[i] = num;
             // putting values into box array
             reset = false;
            }

            // Consume the leftover newline after nextInt()
            scnr.nextLine();
        
        System.out.println("Are these your numbers: ");
        for (int i = 0; i<box.length; i++) {
            System.out.println(box[i]);
            //printing out the values in box array
        }
        System.out.println("Y/N: ");
        String response = scnr.nextLine(); //creating a variable for the response so it can be authenticated in the if/else if
        if ("N".equals(response)) {
            reset = true;
        }else if("Y".equals(response)) {
            int randomIndex = random.nextInt(box.length);
            int randomElement = box[randomIndex];

            System.out.println("randomly selected number: " + randomElement);
            //random shuffler program
        }
        
    }
    scnr.close(); 
    }

}