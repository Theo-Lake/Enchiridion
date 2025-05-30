#include <stdlib.h>
#include <stdio.h>

int main(){
    int capacity = 1;
    int* arr = malloc(capacity * sizeof(int));

    int num = 1;
    int i = 0;
    while(num != 0){

        scanf("%d", &num);
        if(num == 0) break;
        if(i >= capacity) {
            capacity *= 2;
            arr = realloc(arr, capacity * sizeof(int));
        }
        arr[i] = num;
        i++;
    
    }

    for (int j = 0; j < i; j++)
        {
            printf("%d ", arr[j]);
        }
        printf("\n");
        


    

}