// Create a data structure that implements the requirements of a Least Recently Used (LRU) cache with O(1) average time complexity.

// Initialize an object with a maxium capacity of elements.
// getItem Return the value of the key. Update cache with the most recently used key.
// putItem Create or update a key value pair in the cache. Evict the least recently used key if the size of keys exceeds the max capacity.

class LRU {
    constructor(capacity) { // constructor is like a function that gets called when a new obj is init
        this.capacity = capacity; // number that defines how long the cache can get
        this.cache = new Map(); // using a map and not a regular obj because it will maintain the order of the key-value pairs added
    }

    getItem(key) { // retreive an item from it's cache based on it's key
        const item = this.cache.get(key);

        if (item) {
            this.cache.delete(key);
            this.cache.set(key, item);
        }
        return item;
    }

   putItem(key, val) {
       if (this.cache.has(key)) {
           this.cache.delete(key);
       }

       else if (this.cache.size == this.capacity) {
           this.cache.delete(this.oldestItem);    
       }


       this.cache.set(key, val);
    }

    get oldestItem() {
        return this.cache.keys().next().value;
    }

}

const cache = new LRU(5);
cache.putItem('a', 1);
let getItm = cache.getItem('a');
console.log(getItm);
