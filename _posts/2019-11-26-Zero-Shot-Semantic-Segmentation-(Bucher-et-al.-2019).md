---
title: "Zero-Shot Semantic Segmentation (Bucher et al. 2019)"
date: 2019-11-26T13:00:00-02:00
categories:
  - article-essence
tags:
  - Segmentation
  - essence
---

Authors of the paper aims to achieve high segmentation scores on for the classes, which have no train markup, but the images containing this classes being accessable.
Approach uses semantic relations between words used as labels, to estimate the relations between the expected latent representations.

Suppose we have the dataset composed of two parts: 
 - $$ \{x_k, y_k\}_{k=1}^{N} $$, containing the segmentation targets $$ y $$ for the classes $$ \mathcal{C} $$
 - $$ \{\tilde{x}_k, \tilde{y}_k\}_{k=1}^{L} $$, containing only classification targets $$ \tilde{y} $$ for the superset of classes $$ \mathcal{\tilde{C}}: \vert \mathcal{C} \vert < \vert \mathcal{\tilde{C}} \vert $$

Additional requirement is, we have the class labels described with real words. Thus, we can use pre-trained model to make use of semantics of representations behind this words.

The training procedure is three-step:

*Classical FCN training*. 
On this step we simply train FCN $$f_{\Theta}$$ segmentation network in a classical, fully-supervised manner on the first part of dataset $$ \{x_k, y_k\}_{k=1}^{N} $$.

*Generative model training*.
Now we compose the new dataset.
Suppose, we split the FCN to the two parts, feature generator and classifier. 
Applied one-by-one these two networks will give the same result $$f_{\Theta_1} \left( f_{\Theta_2} \left( x_k \right) \right) =  f_{\Theta} \left(x_k \right)$$.
For the sake of simplicity we can suppose the $$ f_{\Theta_1} $$ is the last layer converting latent features to the class scores but generally this simplicity is not required.


[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
