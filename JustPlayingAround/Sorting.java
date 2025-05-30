import java.time.Duration;
import java.time.Instant;
import java.util.Random;

public class Sorting {

    public static void printArray(int[] arr) {

        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) {
                System.out.print(",");
            }
        }
        System.out.println("]");

    }

    public static int[] randomArray() {
        Random random = new Random();
        int size = random.nextInt(10000) + 5;

        int[] arr = new int[size];

        for (int i = 0; i < size; i++) {
            arr[i] = random.nextInt(30000) + 1;
        }

        return arr;
    }

    // --------------- SORTING ALGORITHMS ----------------------

    public static void bubbleSort(int[] arr) {
        boolean swapped = true;
        while (swapped) {
            swapped = false;
            for (int i = 0; i < arr.length - 1; i++) {
                if (arr[i] > arr[i + 1]) {
                    swapped = true;
                    int temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                }
            }

        }

    }

    public static void selectionSort(int[] arr) {

        for (int i = 0; i < arr.length - 1; i++) {
            int min = arr[i];
            int indexMin = i;

            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < min) {
                    min = arr[j];
                    indexMin = j;
                }
            }

            int temp = arr[i];
            arr[i] = arr[indexMin];
            arr[indexMin] = temp;

        }

    }

    public static void mergeSort(int[] arr) {

        if (arr.length < 2) {
            return;
        }

        int midIndex = arr.length / 2;
        int[] leftHalf = new int[midIndex];
        int[] rightHalf = new int[arr.length - midIndex];

        System.arraycopy(arr, 0, leftHalf, 0, midIndex);
        for (int i = midIndex; i < arr.length; i++) {
            rightHalf[i - midIndex] = arr[i];
        }

        mergeSort(leftHalf);
        mergeSort(rightHalf);

        int i = 0, j = 0, k = 0;
        while (i < leftHalf.length && j < rightHalf.length) {
            if (leftHalf[i] <= rightHalf[j]) {
                arr[k] = leftHalf[i];
                i++;
            } else {
                arr[k] = rightHalf[j];
                j++;
            }
            k++;
        }
        while (i < leftHalf.length) {
            arr[k] = leftHalf[i];
            i++;
            k++;
        }
        while (j < rightHalf.length) {
            arr[k] = rightHalf[j];
            j++;
            k++;
        }

    }

    public static void quickSort(int[] arr) {

    }

    public static void insertionSort(int[] arr) {

    }

    public static void heapSort(int[] arr) {

    }

    // --------------- END SORTING ALGORITHMS ------------------

    public static void main(String[] args) {

        int[] arr = randomArray();

        System.out.println("Bubble Sort: ");

        System.out.println("Unsorted: ");
        printArray(arr);
        Instant start = Instant.now();
        bubbleSort(arr);
        Instant end = Instant.now();
        System.out.println("Sorted: ");
        printArray(arr);
        System.out.println("Time taken: " + Duration.between(start, end).toMillis() + " ms");

        System.out.println("------------");

        System.out.println("Selection Sort: ");

        arr = randomArray();
        System.out.println("Unsorted: ");
        printArray(arr);
        start = Instant.now();
        selectionSort(arr);
        end = Instant.now();
        System.out.println("Sorted: ");
        printArray(arr);
        System.out.println("Time taken: " + Duration.between(start, end).toMillis() + " ms");

        System.out.println("------------");

        System.out.println("Merge Sort: ");

        arr = randomArray();
        System.out.println("Unsorted: ");
        printArray(arr);
        start = Instant.now();
        mergeSort(arr);
        end = Instant.now();
        System.out.println("Sorted: ");
        printArray(arr);
        System.out.println("Time taken: " + Duration.between(start, end).toMillis() + " ms");

        System.out.println("------------");

        System.out.println("Quick Sort: ");

        arr = randomArray();
        System.out.println("Unsorted: ");
        printArray(arr);
        start = Instant.now();
        quickSort(arr);
        end = Instant.now();
        System.out.println("Sorted: ");
        printArray(arr);
        System.out.println("Time taken: " + Duration.between(start, end).toMillis() + " ms");

        System.out.println("------------");

        System.out.println("Insertion Sort: ");

        arr = randomArray();
        System.out.println("Unsorted: ");
        printArray(arr);
        start = Instant.now();
        insertionSort(arr);
        end = Instant.now();
        System.out.println("Sorted: ");
        printArray(arr);
        System.out.println("Time taken: " + Duration.between(start, end).toMillis() + " ms");

        System.out.println("------------");

        System.out.println("Heap Sort: ");

        arr = randomArray();
        System.out.println("Unsorted: ");
        printArray(arr);
        start = Instant.now();
        heapSort(arr);
        end = Instant.now();
        System.out.println("Sorted: ");
        printArray(arr);
        System.out.println("Time taken: " + Duration.between(start, end).toMillis() + " ms");

    }
}
