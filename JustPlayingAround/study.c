#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct person{

    int age;
    int height;
    char name[100];

} Person;

Person new_person(int age, int height, char name){

    Person human;

    human.age = age;
    human.height = height;
    strcpy(human.name, name);

    return human;
}



int main(){
 
    Person* people = malloc(20 * sizeof(Person));
    people[0] = new_person(19,174,"Theo");
    
}