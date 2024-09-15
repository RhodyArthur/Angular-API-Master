import { Injectable } from '@angular/core';
import { CacheItem } from '../interface/cache';
import { Observable } from 'rxjs';
import { Data } from '../interface/data';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  private cache = new Map<string, CacheItem>();
  private cacheDuration = 300000; // 5 minutes

  // retrieve cached data if it exists and is not expired
  get(key: string): any | null {
    const entry = this.cache.get(key);

    if(entry) {
      if(Date.now() < entry.expiration) {
        return entry.data;
      }
      else {
        this.cache.delete(key);
      }
    }
    return null
  }


  // store data in the cahe with an expiration timestamp
  set(key: string, data: Data) {
    const expiration = Date.now() + this.cacheDuration;
    this.cache.set(key, {data, expiration})
  }

  // clear all cache
  clear() {
    this.cache.clear();
  }
}
