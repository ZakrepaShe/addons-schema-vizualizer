export const api = () => ({
  getSingleUser: user => fetch(`https://api.github.com/users/${user}`).then(
    res => {
      if (res.status >= 200 && res.status < 300) {
        return Promise.resolve(res.json())
      } else {
        return Promise.reject(res.statusText || res.status)
      }
    }

  ),
});