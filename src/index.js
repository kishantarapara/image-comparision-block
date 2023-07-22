const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { PanelBody, Button, ResponsiveWrapper } = wp.components;
const { Fragment, useState } = wp.element;
const { __ } = wp.i18n;

const BlockEdit = (props) => {
  const { attributes, setAttributes } = props;
  const { beforeImageUrl, afterImageUrl, beforeImageId, afterImageId } =
    attributes;
  const [sliderPosition, setSliderPosition] = useState(50);

  const removeBefore = () => {
    setAttributes({
      beforeImageId: 0,
      beforeImageUrl: "",
    });
  };
  const removeAfter = () => {
    setAttributes({
      afterImageId: 0,
      afterImageUrl: "",
    });
  };

  const onSelectBefore = (media) => {
    setAttributes({
      beforeImageId: media.id,
      beforeImageUrl: media.url,
    });
  };
  const onSelectAfter = (media) => {
    setAttributes({
      afterImageId: media.id,
      afterImageUrl: media.url,
    });
  };

  const handleSliderChange = (event) => {
    setSliderPosition(event.target.value);
  };

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__("Select Before Image", "awp")} initialOpen={true}>
          <div className="editor-post-featured-image">
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onSelectBefore}
                value={attributes.beforeImageId}
                allowedTypes={["image"]}
                render={({ open }) => (
                  <Button
                    className={
                      beforeImageId == 0
                        ? "editor-post-featured-image__toggle"
                        : "editor-post-featured-image__preview"
                    }
                    onClick={open}
                  >
                    {beforeImageId == 0 && __("Choose an image", "awp")}
                    {beforeImageId !== 0 && (
                      <ResponsiveWrapper>
                        <img src={beforeImageUrl} />
                      </ResponsiveWrapper>
                    )}
                  </Button>
                )}
              />
            </MediaUploadCheck>
            {beforeImageId != 0 && (
              <MediaUploadCheck>
                <MediaUpload
                  title={__("Replace image", "awp")}
                  value={beforeImageId}
                  onSelect={onSelectBefore}
                  allowedTypes={["image"]}
                  render={({ open }) => (
                    <Button onClick={open} isDefault isLarge>
                      {__("Replace image", "awp")}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            )}
            {beforeImageId != 0 && (
              <MediaUploadCheck>
                <Button onClick={removeBefore} isLink isDestructive>
                  {__("Remove image", "awp")}
                </Button>
              </MediaUploadCheck>
            )}
          </div>
        </PanelBody>
        <PanelBody title={__("Select After Image", "awp")} initialOpen={true}>
          <div className="editor-post-featured-image">
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onSelectAfter}
                value={afterImageId}
                allowedTypes={["image"]}
                render={({ open }) => (
                  <Button
                    className={
                      afterImageId == 0
                        ? "editor-post-featured-image__toggle"
                        : "editor-post-featured-image__preview"
                    }
                    onClick={open}
                  >
                    {afterImageId == 0 && __("Choose an image", "awp")}
                    {afterImageId !== 0 && (
                      <ResponsiveWrapper>
                        <img src={afterImageUrl} />
                      </ResponsiveWrapper>
                    )}
                  </Button>
                )}
              />
            </MediaUploadCheck>
            {afterImageId != 0 && (
              <MediaUploadCheck>
                <MediaUpload
                  title={__("Replace image", "awp")}
                  value={afterImageId}
                  onSelect={onSelectAfter}
                  allowedTypes={["image"]}
                  render={({ open }) => (
                    <Button onClick={open} isDefault isLarge>
                      {__("Replace image", "awp")}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            )}
            {afterImageId != 0 && (
              <MediaUploadCheck>
                <Button onClick={removeAfter} isLink isDestructive>
                  {__("Remove image", "awp")}
                </Button>
              </MediaUploadCheck>
            )}
          </div>
        </PanelBody>
      </InspectorControls>
      <div>
        <div class="c-compare" style={{ "--value": `${sliderPosition}%` }}>
          <img class="c-compare__left" src={beforeImageUrl} alt="Before" />
          <img class="c-compare__right" src={afterImageUrl} alt="After" />
          <input
            type="range"
            class="c-rng c-compare__range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

registerBlockType("image-comparison-block/interactive-image-comparison-block", {
  title: "Image Comparison Block",
  description:
    "This block enables users to compare two images interactively using a slider.",
  icon: "image-flip-horizontal",
  category: "media",
  attributes: {
    beforeImageId: {
      type: "number",
      default: 0,
    },
    beforeImageUrl: {
      type: "string",
      default: "",
    },
    afterImageId: {
      type: "number",
      default: 0,
    },
    afterImageUrl: {
      type: "string",
      default: "",
    },
  },
  edit: BlockEdit,
  save: (props) => {
    const { attributes } = props;
    const { beforeImageUrl, afterImageUrl } = attributes;

    return (
      <div>
        <div class="c-compare" style={{ "--value": `${50}%` }}>
          <img class="c-compare__left" src={beforeImageUrl} alt="Before" />
          <img class="c-compare__right" src={afterImageUrl} alt="After" />
          <input
            type="range"
            class="c-rng c-compare__range"
            min="0"
            max="100"
            value={50}
          />
        </div>
      </div>
    );
  },
});
