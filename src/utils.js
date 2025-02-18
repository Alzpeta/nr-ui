import sanitizeHtml from "sanitize-html";

function arraysDiffer (a, b) {
  if (a.length !== b.length) {
    return true
  }
  a = a.map(x => x.slug)
  b = b.map(x => x.slug)
  a.sort()
  b.sort()
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return true
  }
  return false
}


function arrayContains (arr, x) {
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i].slug === x.slug) return true
  }
  return false
}

function empty (x) {
  return x === null || x === undefined
}


function copyValue (a) {
  if (a === null || a === undefined) {
    return a
  }
  if (Array.isArray(a)) {
    return a.map(x => copyValue(x))
  }
  return { ...a }
}

function termOrArrayChanged (a, b) {
  if (empty(a) && empty(b)) {
    return false
  }
  if ((empty(a) && !empty(b)) || (!empty(a) && empty(b))) {
    return true
  }
  if (Array.isArray(a) !== Array.isArray(b)) {
    return true
  }
  if (!Array.isArray(a)) {
    return a.slug !== b.slug
  }
  return arraysDiffer(a, b)
}

function pathFromUrl(url) {
  return new URL(url).pathname
}

function parseCommunityRole(role) {
  const {prefix, communityId, roleName}= role.id.split(':')
  if (prefix !== 'community') {
    return undefined
  }
  return {prefix: prefix, communityId: communityId, roleName: roleName}
}

function sanitize (value) {
  if (value) {
    Object.keys(value).map(function (key, index) {
      value[key] = sanitizeHtml(value[key], {allowedTags: []})
    })
  }
  return value
}

export {
  arraysDiffer, arrayContains, termOrArrayChanged, copyValue, pathFromUrl, parseCommunityRole, sanitize
}
