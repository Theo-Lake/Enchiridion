#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

int removeElement(int* nums, int numsSize, int val) {
    int head = 0;

    for (int i = 0; i < numsSize; i++) {
        if (nums[i] == val) {
            nums[head++] = nums[i];
        }
    }

    for (int i = head; i < numsSize; i++) {
        nums[i] = 0;
    }

    return head;
}

int main(){

    int nums[] = {2,3,2,0,2,4};
    int size = 6;
    int target = 2;
    printf("%d\n",removeElement(nums,size,target));
    assert(removeElement(nums,size,target) == 3);
    
    printf("[");
    for (int i = 0; i < size; i++){
       printf("%d",nums[i]);
       if(i != size -1){
        printf(",");
       }
    }
    printf("]\n");

    int expected[] = {2,2,2,0,0,0};
    for (int i = 0; i < size; i++) {
         assert(nums[i] == expected[i]);
     }
    
}