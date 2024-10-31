
import java.util.Scanner;

public class array2d {

    public static void bubbleSort(int array[][]) {

        int rows = array.length;
        int cols = array[0].length;
        boolean swapped = true;

        int totEl = rows * cols;
        while (swapped = true) {

            swapped = false;
            for (int i = 0; i < totEl - 1; i++) {
                // Calc the row and col for the current element and the next element
                int curRow = i / cols;
                int curCol = i % cols;
                int nextRow = (i + 1) / cols;
                int nextCol = (i + 1) % cols;

                if (array[curRow][curCol] > array[nextRow][nextCol]) {
                    swapped = true;
                    int temp = array[curRow][curCol];
                    array[curRow][curCol] = array[nextRow][nextCol];
                    array[nextRow][nextCol] = temp;
                    // saving to temp variable so element isn't lost
                }

            }
            // GPT utilized since i have never done a sorting alg for 2D arrays, only for 1D
        }
    }

    public static void main(String[] args) {

        int sL;
        String students;
        int grades;
        int gL;

        Scanner scanner = new Scanner(System.in);
        // creating variables for the lengths of the arrays

        System.out.println("This is a student and grading storage program.");
        System.out.println("How many students do you have?: ");

        sL = scanner.nextInt();

        System.out.println("How many grades do each of them have?: ");

        gL = scanner.nextInt();

        String[] studentA = new String[sL];
        int[][] gradesA = new int[sL][gL];
        // scanning and creating the arrays

        System.out.println("Please state the names of the students: ");
        for (int i = 0; i < sL; i++) {
            students = scanner.next();
            studentA[i] = students;
        }

        for (int i = 0; i < sL; i++) {
            System.out.println("Please enter " + studentA[i] + "'s grade (out of 100): ");
            for (int j = 0; j < gL; j++) {
                grades = scanner.nextInt();
                gradesA[i][j] = grades;
            }
        }
        // filling the 2d array with values.

        System.out.println("Here are your students' information: ");

        for (int i = 0; i < sL; i++) {
            System.out.println(studentA[i]);
            // outputs students name first
            for (int j = 0; j < gL; j++) {
                System.out.println(gradesA[i][j]);
            }
        }

        // below is concept code to be added later on

        String option;
        boolean reset = true;

        while (reset) {

            System.out.println();
            System.out.println("What would you like to do with this information?");
            System.out.println("Choose from one of these options: ");
            System.out.println("Average, Median, Total, EXIT");
            option = scanner.next();

            if (option.equals("Average")) {

                System.out.println();

                for (int i = 0; i < sL; i++) {

                    double sum = 0;
                    double avg = 0;

                    System.out.println(studentA[i] + "'s average is:");

                    for (int j = 0; j < gL; j++) {

                        sum = sum + gradesA[i][j];
                        avg = sum / gL;
                    }

                    System.out.println(avg);

                }

            }

            else if (option.equals("Median")) {

                System.out.println();

                for (int i = 0; i < sL; i++) {

                    double med = 0;

                    bubbleSort(gradesA);

                    // Calculate the median for each student's grades
                    if (gL % 2 == 0) {
                        // For even number of grades, median is the average of the two middle grades
                        med = (gradesA[i][gL / 2 - 1] + gradesA[i][gL / 2]) / 2.0;
                    } else {
                        // For odd number of grades, median is the middle grade
                        med = gradesA[i][gL / 2];
                    }

                    System.out.println(studentA[i] + "'s median is:" + med);

                }
                //also used gpt here for debugging    
            }

            // median function

            else if (option.equals("Total")) {

                System.out.println();

                for (int i = 0; i < sL; i++) {

                    int sum = 0;
                    System.out.println(studentA[i] + "'s total is:");

                    for (int j = 0; j < gL; j++) {

                        sum = sum + gradesA[i][j];
                    }

                    System.out.println(sum);

                }

                // total function

            }

            else if (option.equals("EXIT")) {

                reset = false;

                // so the program quits
            }

            else {

                System.out.println();
                System.out.println("That is not an option.");
                System.out.println("Please choose a valid option.");

            }

        }

        scanner.close();

    }

    // printing it out

}
