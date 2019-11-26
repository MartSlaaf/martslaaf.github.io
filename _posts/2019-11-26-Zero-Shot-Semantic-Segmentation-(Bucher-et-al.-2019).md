---
title: "Zero-Shot Semantic Segmentation (Bucher et al. 2019)"
date: 2019-11-26T13:00:00-02:00
categories:
  - article-essence
tags:
  - Segmentation
---

Authors of the paper aims to achieve high segmentation scores on for the classes, which have no train markup, but the images containing this classes being accessable.
Approach uses semantic relations between words used as labels, to estimate the relations between the expected latent representations.

Suppose we have the dataset composed of two parts: 
 - $$ \{x_k, y_k\}_{k=1}^{N} $$, containing the segmentation targets $$ y $$ for the classes $$ \mathcal{C} $$
 - $$ \{\tilde{x}_k, \tilde{y}_k\}_{k=1}^{L} $$, containing only classification targets $$ \tilde{y} $$ for the superset of classes $$ \mathcal{\tilde{C}}: \vert \mathcal{C} \vert < \vert \mathcal{\tilde{C}} \vert $$

Additional requirement is, we have the class labels described with real words. Thus, we can use pre-trained model to make use of semantics of representations behind this words.

The training procedure is three-step:

*Classical FCN training*. 
On this step we simply train FCN $$f_{\theta}$$ segmentation network in a classical, fully-supervised manner on the first part of dataset $$ \{x_k, y_k\}_{k=1}^{N} $$.
Suppose, we split the FCN to the two parts, feature generator and classifier. 
Applied one-by-one these two networks will give the same result $$f_{\theta_2} \left( f_{\theta_1} \left( x_k \right) \right) =  f_{\theta} \left(x_k \right)$$.
For the sake of simplicity we can suppose the $$ f_{\theta_2} $$ is the last layer converting latent features to the class scores but generally this is not required.

*Generative model training*.
Now we compose the new dataset.
Suppose we have the mapping function $$ a(y_k) $$, which maps class label to the vector of the fixed length.
It could be trained embedding or any other approach which provides semantically-consistent mapping.
So, the new dataset is $$ \{ a(y_{k,i,j}), f_{\theta_2}(x_k)_{i, j} \}_{k,i,j = 1}^{N, W, H} $$.
It is the dataset which maps the embedding of the name of the class of the particular pixel to the latent features of the segmentation network, presented in the same pixel.
Now we train generative model $$ f_{\sigma}(a(y_{k,i,j}) \rightarrow f_{\theta_2}(x_k)_{i,j}) $$.
We require from this model to match distributions of generated and real features for each class from the $$ \mathcal{C} $$.
So, now we have the generator of latent features conditioned by their names.

*Classificator retraining*.
Now we can generate the dataset of the generated pairs $$ \{f_{\sigma} \left( a \left( c_i \right) \right), c_i \}_{i=1}^K $$ for each class $$ c_i \in \mathcal{C} \cup \mathcal{\tilde{C}} $$ of an arbitrary size $$ K $$.
We create new network $$ f_{\hat{\theta}_2} $$ instead of $$ f_{\theta_2} $$ having the same size of input, and expanded output of size $$ \vert \mathcal{C} \cup \mathcal{\tilde{C}} $$, and train it on the generated data.
After training we re-assemble FCN as $$ f_{theta} (x) := f_{\hat{\theta}_2} \left(  f_{\theta_1}\left(x\right)\right) $$.

Now, if we have well-trained all the components (I suppose, the most critical one is class-names embedding), we can use our new network for the segmentation of classes, which we have not segmentation markup for.
Authors show good results both qualitatively and quantitatively.
There are additional tricks to achieve more quality, including post-processing and self-training.

[paper](https://arxiv.org/abs/1906.00817)
[github](https://github.com/valeoai/ZS3)
