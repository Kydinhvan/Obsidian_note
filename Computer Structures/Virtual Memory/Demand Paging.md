Data is not copied from the [[Swap Space]] to the [[Dynamic Random-Access Memory (DRAM)|physical memory]] **until they are needed** by the CPU

When the CPU requests a page's [[Virtual Address (VA)]] that hasn't been loaded before, it results in a [[Page Fault Exception]]. Thus, the CPU needs to 
1. Pull this page from the Disk (not [[Swap Space]]) into the RAM
2. Update the [[Page Table]] of the [[Physical Address (PA)]],
3. Continue

